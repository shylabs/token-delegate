import * as anchor from '@project-serum/anchor';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { Program, BN} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { TokenDelegate } from '../target/types/token_delegate';
import { PublicKey } from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { connect } from 'http2';

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

const currencies = {
  'USDC' : 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',
  'WSOL' : 'So11111111111111111111111111111111111111112'
}

async function findAssociatedTokenAddress(
  walletAddress : PublicKey,
  tokenMintAddress: PublicKey
){
  return (await PublicKey.findProgramAddress(
      [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  ))[0];
}

const connection = new anchor.web3.Connection('https://api.devnet.solana.com/');





describe('sanity check', () => {
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.TokenDelegate as Program<TokenDelegate>;
  it('Hello world works', async () => {
    const tx = await program.methods.helloWorld().rpc()
    console.log('tx:', tx);
    expect(tx).toBeTruthy();
  })

  it('Echo', async () => {
    const tx = await program.methods.echoNumber(new BN(3)).rpc()
    console.log('tx:', tx);
    expect(tx).toBeTruthy();
  })
})



describe('token-delegate', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TokenDelegate as Program<TokenDelegate>;
  const alice = anchor.web3.Keypair.generate();
  const delegate = anchor.web3.Keypair.generate()
  const tokenMintAddress = new PublicKey(currencies.USDC)

  provider.connection.requestAirdrop(alice.publicKey, anchor.web3.LAMPORTS_PER_SOL);


  it('approves a delegate for token transfers', async () => {
    const tx = await program.methods
      .delegateApprove(false, new anchor.BN(5),new anchor.BN(10))



  })

  it('Is initialized!', async () => {
    //const tokenAccount = await findAssociatedTokenAddress(alice.publicKey, tokenMintAddress) as PublicKey;
    const addressToken = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      alice,
      tokenMintAddress,
      alice.publicKey
    );
    console.log('address??')
    console.log('addressToken', addressToken)
    const amount = new anchor.BN(5)
    const tx = await program.methods
      .delegateLink(amount)
      .accounts({
        owner: alice.publicKey,
        delegateRoot : delegate.publicKey,
        tokenAccount : addressToken.address,
      })
      .signers([alice])
      .rpc()
      console.log(tx);
    // Add your test here
    expect(true).toBe(true)
  });

});
