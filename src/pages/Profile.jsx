import { useEffect, useState } from 'react';
import "./Profile.css";
import Sidebar from '../components/Sidebar';
import useRegistration from "../Api/user";
import { fetchTransactions } from "../Api/transaction";
import { getActiveGoals, addGoal } from "../Api/goals";
import { getActiveBudget } from "../Api/budget";





function Profile() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [investmentTotal, setInvestmentTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [expenceTotal, setExpenceTotal] = useState(0);
    const [savingTotal, setSavingTotal] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [goals, setGoals] = useState([]);
    const [budget, setBudget] = useState([]);
    const handleAddGoal = () => {
        const newGoal = {
            goal_name: goalName,
            goal_amount: goalAmount,
            start_date: startDate,
            end_date: endDate,
        };
        addGoal(newGoal);
        setGoalName("");
        setGoalAmount("");
        setStartDate("");
        setEndDate("");
    };

    /* =========================================
         FETCH BUDGETS
     ========================================= */
    useEffect(() => {
        const fetchBudgetData = async () => {
            const today = new Date().toISOString().split("T")[0];
            const data = await getActiveBudget(today);
            if (data) {
                setBudget(data);
            }
        };
        fetchBudgetData();

        const loadGoals = async () => {
            setLoading(true);
            const data = await getActiveGoals();
            if (data) {
                setGoals(data);
            }
            setLoading(false);
        };
        loadGoals();
    }, []);


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
                            <label>Username:{userName}</label>
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
                <div className='goal-container'>
                    <label>Financial Goals</label>
                    <div className="add-goal-container">
                        <input
                            type="text"
                            placeholder="Goal Name"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Goal Amount"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button onClick={handleAddGoal}>Add Goal</button>
                    </div>
                    <div className="goals-list-container">
                        {goals.map((goal) => (
                            <div className="goal-item" key={goal.id}>
                                <h3>{goal.goal_name}</h3>
                                <p>Target: {goal.goal_amount}</p>
                                <p>Deadline: {goal.end_date}</p>
                            </div>
                        ))}
                    </div>

                </div>
                 <div className='profile-info-update'>
                            <label className='info-update-header'>Update Password </label>
                            <input type="password" placeholder='Current Password' />
                            <input type="password" placeholder='Confirm Password' />
                            <input type="password" placeholder='New Password' />
                            <button>Update</button>
                        </div>
            </div>
        </div>
    );
}

export default Profile;