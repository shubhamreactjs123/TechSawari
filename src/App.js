import Login from './components/Login';
import Dashboard from './components/Dashboard';
import User from './components/Users';
import Drivers from './components/Drivers';
import Vehicals from './components/Vehicals';
import Static from './components/Static';
import Rides from './components/Rides';
import Booking from './components/Booking';
import BookingPayment from './components/BookingPayment';
import Transaction from './components/Transaction';
import ProfilePage from './components/ProfilePage';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import ViewUser from './components/ViewUser';
import ViewDriver from './components/ViewDriver';
import ViewDocs from './components/ViewDocs';
import AddVehical from './components/AddVehical';
import AddStatic from './components/AddStatic'
import Withdrawal from './components/Withdrawal';
import WithdrawApproved from './components/WithdrawApproved';
import EditStatic from './components/EditStatic';
import EditProfile from './components/EditProfile';
import StateCity from './components/StateCity';
import AddCity from './components/AddCity';
import EditVehical from './components/EditVehical';
import Commision from './components/Commision';
import AddCommision from './components/AddCommision';
import EditCommision from './components/EditCommision';
import ViewVehical from './components/ViewVehical';
import ViewBookingPayment from './components/ViewBookingPayment';
import ViewTransaction from './components/ViewTransaction';
import ViewBookingDetails from './components/ViewBookingDetails';
import Setting from './components/Setting';
import ForgetPasword from './components/ForgetPassword';
import ChangePasword from './components/ChangePassword';
import CompleteBooking from './components/CompleteBooking';
import PendingBooking from './components/PendingBooking';
import CancelBooking from './components/CancelBooking';
import CompleteDateWise from './components/CompleteDateWise';
import PendingDateWise from './components/PendingBookingDateWise';
import CancelDateWise from './components/CancelDateWise';
import BookingDateWise from './components/BookingDateWise';
import BlockedBooking from './components/BlockedBooking';


function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPasword />} />
        <Route path='/change-password' element={<ChangePasword />} />
        <Route element={<Home />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={<User />} />
          <Route path='/user/view/:id' element={<ViewUser />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/drivers' element={<Drivers />} />
          <Route path='/driver/view/:id' element={<ViewDriver />} />
          <Route path='/docs/view/:id' element={<ViewDocs />} />
          <Route path='/vehicals' element={<Vehicals />} />
          <Route path='/add-vehical' element={<AddVehical />} />
          <Route path='/editvehical/:id' element={<EditVehical />} />
          <Route path='/static' element={<Static />} />
          <Route path='/add-static' element={<AddStatic />} />
          <Route path='/static/edit/:id' element={<EditStatic />} />
          <Route path='/rides' element={<Rides />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/booking/datewise' element={<BookingDateWise />} />
          <Route path='/complete-booking' element={<CompleteBooking />} />
          <Route path='/complete-booking/datewise' element={<CompleteDateWise />} />
          <Route path='/pending-booking' element={<PendingBooking />} />
          <Route path='/pending-booking/datewise' element={<PendingDateWise />} />
          <Route path='/cancel-booking' element={<CancelBooking />} />
          <Route path='/cancel-booking/datewise' element={<CancelDateWise />} />
          <Route path='/booking-payment' element={<BookingPayment />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/withdrawal' element={<Withdrawal />} />
          <Route path='/withdrawal/view/:id' element={<WithdrawApproved />} />
          <Route path='/admin-profile' element={<ProfilePage />} />
          <Route path='/state' element={<StateCity />}/>
          <Route path='/addcity' element={<AddCity />} />
          <Route path='/commision' element={<Commision />} />
          <Route path='/add-commision' element={<AddCommision />} />
          <Route path='/edit-commision/:id' element={<EditCommision />} />
          <Route path='/view-vehical/:id' element={<ViewVehical />} />
          <Route path='/view-complete-booking/:id' element={<ViewBookingPayment />} />
          <Route path='/view-booking-details/:id' element={<ViewBookingDetails />} />
          <Route path='/view-transaction/:id' element={<ViewTransaction />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/blocked-booking' element={<BlockedBooking />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
