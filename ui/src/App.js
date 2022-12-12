import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ApplicationForm from './components/applicationForm';
import ApplicationList from './components/applications';
import LoginPage from './components/login';
import SignUpPage from './components/signup';
import ForgotPasswordPage from './components/forgotPassword';
import Employees from './components/employees';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/applicationform' element={<ApplicationForm />} />
                <Route path='/leaveforms' element={<ApplicationList />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/employees' element={<Employees />} />
                <Route path='/forgotpassword' element={<ForgotPasswordPage/>} />
                <Route exact path='/' element={<SignUpPage />} />


            </Routes>
        </BrowserRouter>

    );
}

export default App;