import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TokenDelegate } from '../target/types/token_delegate';

describe('token-delegate', () => {
  anchor.setProvider(anchor.Provider.env());
  console.log(anchor.Provider.env())

  const program = anchor.workspace.TokenDelegate as Program<TokenDelegate>;
  const alice = anchor.web3.Keypair.generate();
  const delegate = anchor.web3.Keypair.generate()
  console.log('program', program)

  it('Is initialized!', async () => {
    await program.methods
      .delegateLink(5)
      .accounts({
        owner: alice,
        delegateRoot : delegate,
        tokenAccount: 
      })
    // Add your test here
    expect(true).toBe(true)
  });
});
