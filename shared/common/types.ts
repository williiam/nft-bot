// 是不是直接用declare做成全域type,連export都不用
export interface DataToSign {
  address: string | null
  whaleAdress?: string | null
  signer?: string | null
  network?: string | null
  provider?: string | null
}
