import { Progress } from 'antd'
import React from 'react'

const Analytics = ({alltransaction}) => {
    const category = ["salary", "tip", "freelance","food", "movies", "expense", "medical", "fee", "tax"]
    const totalTransaction = alltransaction.length
    const totalIncome = alltransaction.filter(transaction => transaction.type  ==="income")
    const totalExpenses = alltransaction.filter(transaction => transaction.type  ==="expense")
    const totalIncomePercent = (totalIncome.length/totalTransaction)*100
    const totalExpensePercent = (totalExpenses.length/totalTransaction)*100

    const totalTurnOver = alltransaction.reduce((acc,transaction)=>acc+transaction.amount,0)
    const totalIncomeTurnOver = alltransaction.filter((transaction)=>transaction.type ==="income").reduce((acc,transaction)=>acc+transaction.amount,0)
    const totalExpenseTurnOver = alltransaction.filter((transaction)=>transaction.type ==="expense").reduce((acc,transaction)=>acc+transaction.amount,0)
    const totalIncomeTurnOverPercent = (totalIncomeTurnOver/totalTurnOver)*100
    const totalExpenseTurnOverPercent = (totalExpenseTurnOver/totalTurnOver)*100

  return (
    <>
    <div className='row m-3'>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Transaction: {totalTransaction}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income: {totalIncome.length }</h5>
                    <h5 className='text-danger'>Expense: {totalExpenses.length}</h5>
                    <div>
                    <Progress type='circle' strokeColor={'green'} className="mx-2"
                        percent={totalIncomePercent.toFixed(0)}
                    />
                    <Progress type='circle' strokeColor={'red'} className="mx-2"
                        percent={totalExpensePercent.toFixed(0)}
                    />
                    </div>
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Turnover: {totalTurnOver}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income: {totalIncomeTurnOver }</h5>
                    <h5 className='text-danger'>Expense: {totalExpenseTurnOver}</h5>
                    <div>
                    <Progress type='circle' strokeColor={'green'} className="mx-2"
                        percent={totalIncomeTurnOverPercent.toFixed(0)}
                    />
                    <Progress type='circle' strokeColor={'red'} className="mx-2"
                        percent={totalExpenseTurnOverPercent.toFixed(0)}
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='row'>
        <div className='col-md-4'>
            <h4>Category Wise Income</h4>
            {category.map(category=>{
                const amount = alltransaction.filter((transaction)=>transaction.type="income" && transaction.category === category).reduce((acc,transaction)=>acc+ transaction.amount,0)
                return(
                    amount >0 &&
                    <div className='card'>
                        <div className='card-body'>
                            <h5>{category}</h5>
                            <Progress percent={((amount/totalIncomeTurnOver)*100).toFixed(0)} />
                        </div>
                    </div>
                )
            })}
        </div>
        <div className='col-md-4'>
            <h4>Category Wise Expense</h4>
            {category.map(category=>{
                const amount = alltransaction.filter((transaction)=>transaction.type="expense" && transaction.category === category).reduce((acc,transaction)=>acc+ transaction.amount,0)
                return(
                    amount >0 &&
                    <div className='card'>
                        <div className='card-body'>
                            <h5>{category}</h5>
                            <Progress percent={((amount/totalExpenseTurnOver)*100).toFixed(0)} />
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default Analytics