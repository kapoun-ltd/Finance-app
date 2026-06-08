import { useEffect, useState } from 'react';
import "./Profile.css";
import Sidebar from '../components/Sidebar';
import useRegistration from "../Api/user";
import { fetchTransactions } from "../Api/transaction";
import { getActiveGoals, addGoal , deleteGoal } from "../Api/goals";
import { getActiveBudget } from "../Api/budget";
import { updatepassword } from "../Api/updatepassword";
import { toast } from "react-toastify";         
import supabase from '../services/supabase';


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
    const [selectedGoalId, setSelectedGoalId] = useState(null);

    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /* =========================================
         DELETE GOAL
    ========================================= */
  const handleDelete = async () => {
    const success = await deleteGoal(selectedGoalId);
    if (success) {
        setGoals((prev) => prev.filter((g) => g.id !== selectedGoalId));
        setSelectedGoalId(null);
    }
};
    /* =========================================
         ADD GOAL
    ========================================= */
   
    const handleAddGoal = async () => {
        if (!goalName || !goalAmount || !startDate || !endDate) {
            toast.error("Please fill in all goal fields.");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        const newGoal = {
            goal_name: goalName,
            goal_amount: goalAmount,
            start_date: startDate,
            end_date: endDate,
            user_id: user.id,
        };

        const added = await addGoal(newGoal);
        if (added) {
            setGoals((prev) => [...prev, added]);
            setGoalName("");
            setGoalAmount("");
            setStartDate("");
            setEndDate("");
        }
    };

    /* =========================================
         UPDATE PASSWORD
    ========================================= */
   
    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        await updatepassword(newPassword);
    };

    /* =========================================
         FETCH BUDGETS & GOALS
    ========================================= */
    useEffect(() => {
        const fetchBudgetData = async () => {
            const today = new Date().toISOString().split("T")[0];
            const data = await getActiveBudget(today);
            if (data) setBudget(data);
        };
        fetchBudgetData();

        const loadGoals = async () => {
            setLoading(true);
            const data = await getActiveGoals();
            if (data) setGoals(data);
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
            const data = await fetchTransactions();

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

                
                <h1 className="profile-header">My Profile</h1>

                <div className='console-profile'>
                    <label className='info-header'>Personal Information</label>
                    <div className='profile-info-console'>
                        <div className='profile-info-one'>
                            <label>Username: {userName}</label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Email: {email}</label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Full Name: {fullName}</label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Phone: {phone}</label>
                        </div>
                    </div>
                </div>

          
                <div className="transaction-title-container">
                    <div className="transaction-balance-all-container">
                        <div className="balance-container">
                            <label className='balance-label'>Balance</label>
                            <label className='net-balance'>{balance.toLocaleString()}</label>
                        </div>
                        <div className="expense-container">
                            <label className='expense-label'>Expense</label>
                            <label className='expense-value'>{expenceTotal.toLocaleString()}</label>
                        </div>
                        <div className="income-container">
                            <label className='investment-label'>Investment</label>
                            <label className='investment-value'>{investmentTotal.toLocaleString()}</label>
                        </div>
                        <div className="income-container">
                            <label className='investment-label'>Saving</label>
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
                        <button
                            onClick={() => deleteGoal(selectedGoalId)}
                            disabled={!selectedGoalId}
                        >
                            Delete Goal
                        </button>
                    </div>

                  
                    <div className="goals-list-container">
                        {loading ? (
                            <p>Loading goals...</p>
                        ) : goals.length === 0 ? (
                            <p>No active goals. Add one above!</p>
                        ) : (
                            goals.map((goal) => (
                                <div
                                    className={`goal-item ${selectedGoalId === goal.id ? "goal-selected" : ""}`}
                                    key={goal.id}
                                    onClick={() => setSelectedGoalId(
                                        selectedGoalId === goal.id ? null : goal.id  // ✅ toggle off on second click
                                    )}
                                >
                                    <h3>{goal.goal_name}</h3>
                                    <p>Target: {Number(goal.goal_amount).toLocaleString()}</p>
                                    <p>Deadline: {goal.end_date}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className='profile-info-update'>
                    <label className='info-update-header'>Update Password</label>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleUpdatePassword}>Update</button>
                </div>

            </div>
        </div>
    );
}

export default Profile;