import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedIn={firstName:'Ishaan',lastName:'Yeole',email:'ishaanyeole123@gmail.com'}

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
          type={'greeting'}
          title='Welcome'
          user={loggedIn?.firstName || 'Guest'}
          subtext={"Access and manage your account and transactions efficiently."}
          />

          <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250000}
          />
        </header>

        RECENT TRANSACTIONS

      </div>
      <RightSidebar 
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:240.6},{currentBalance:1000.6}]}
      />
    </section>
  )
}

export default Home