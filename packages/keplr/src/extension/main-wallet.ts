import { ChainRecord, State, Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';
import { Keplr } from '@keplr-wallet/types';

import { preferredEndpoints } from '../config';
import { ChainKeplrExtension } from './chain-wallet';
import { keplrExtensionInfo } from './registry';
import { KeplrExtensionData } from './types';
import { getKeplrFromExtension } from './utils';

export class KeplrExtensionWallet extends MainWalletBase<
  Keplr,
  KeplrExtensionData,
  ChainKeplrExtension
> {
  private _client: Promise<Keplr | undefined>;

  constructor(
    _walletInfo: Wallet = keplrExtensionInfo,
    _chainsInfo?: ChainRecord[]
  ) {
    super(_walletInfo, _chainsInfo);
    this._client = (async () => {
      try {
        return await getKeplrFromExtension();
      } catch (e) {
        return undefined;
      }
    })();
  }

  get client() {
    return this._client;
  }

  setChains(chainsInfo: ChainRecord[]): void {
    this._chains = new Map(
      chainsInfo.map((chain) => {
        chain.preferredEndpoints = {
          rpc: [
            ...(chain.preferredEndpoints?.rpc || []),
            ...(preferredEndpoints[chain.name]?.rpc || []),
          ],
          rest: [
            ...(chain.preferredEndpoints?.rest || []),
            ...(preferredEndpoints[chain.name]?.rest || []),
          ],
        };

        return [chain.name, new ChainKeplrExtension(chain, this)];
      })
    );
  }

  async update() {
    this.setState(State.Done);
  }
}
