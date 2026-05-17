import { useEffect, useState } from 'react';
import "./Profile.css";
import Sidebar from '../components/Sidebar';
import useRegistration from "../Api/user";
import { fetchTransactions } from "../Api/transaction";




function Profile() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [investmentTotal, setInvestmentTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [expenceTotal, setExpenceTotal] = useState(0);
    const [savingTotal, setSavingTotal] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const { userName, fullName, phone, email, registrationData, loading: userLoading } = useRegistration();
    /* =========================================
         FETCH TRANSACTIONS
     ========================================= */
    useEffect(() => {
        const loadTransactions = async () => {
            setLoading(true);

            const data = await fetchTransactions(); // 👈 always all

            if (data) {
                setTransactions(data);

                const income = data
                    .filter((tx) => tx.type === "Income")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);

                const expense = data
                    .filter((tx) => tx.type === "Expense")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);

                setIncomeTotal(income);
                setExpenceTotal(expense);
                setBalance(income - expense);

                const investment = data
                    .filter((tx) => tx.type === "Investment")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);
                setInvestmentTotal(investment);

                const saving = data
                    .filter((tx) => tx.type === "Saving")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);
                setSavingTotal(saving);
            }


            setLoading(false);
        };

        loadTransactions();

    }, []);


    return (
        <div className="profile">
            <Sidebar />
            <div className='profile-container'>
                <hi className="profile-header">My Profile</hi>
                <div className='console-profile'>
                    <label className='info-header'>Personal Information</label>
                    <div className='profile-info-console'>
                        <div className='profile-info-one'>
                            <label>Username:{userName} 👋</label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Email :{email} </label>
                        </div>
                        <div className='profile-info-one'>
                            <label>FullName :{fullName} </label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Phone :{phone} </label>
                        </div>
                    </div>

                </div>

                <div className="transaction-title-container">
                    <div className="transaction-balance-all-container">
                        <div className="transaction-balance-container">
                            <label className='balance-label'>Balance </label>
                            <label className='net-balance'> {balance.toLocaleString()}</label>

                        </div>

                        <div className="transaction-expense-container">
                            <label className='expense-label'>Expense </label>
                            <label className='expense-value'>{expenceTotal.toLocaleString()}</label>
                        </div>

                        <div className="transaction-income-container">
                            <label className='investment-label'>Investment </label>
                            <label className='investment-value'>{investmentTotal.toLocaleString()}</label>
                        </div>

                        <div className="transaction-income-container">
                            <label className='investment-label'>Saving </label>
                            <label className='investment-value'>{savingTotal.toLocaleString()}</label>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Profile;