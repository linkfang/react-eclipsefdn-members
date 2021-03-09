import React, { useContext, useEffect } from 'react';
import MembershipContext from '../../Context/MembershipContext';
import FormChooser from '../FormPreprocess/FormChooser';
import SignInIntroduction from './SignInIntroduction';
import StepperComponent from '../Steppers/StepperComponent';
import { FETCH_HEADER, api_prefix, end_point, fakeChildrenArray, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../Constants/Constants';

const SignIn = ({setStep}) => {

    const {currentUser, setCurrentUser} = useContext(MembershipContext);

    const getFakeUser = () => {
        fetch('membership_data/fake_user.json',{ headers: FETCH_HEADER })
        .then(resp => resp.json())
        .then(data => {
            setCurrentUser(data);
        })
    }

    useEffect(() => {
        if (getCurrentMode() === MODE_REACT_API) {
            fetch(api_prefix + `/${end_point.userinfo}`, { headers: FETCH_HEADER })
            .then(res=> res.json())
            .then(data=> {
                console.log(data)  // {family_name: "User1", given_name: "User1", name: "user1"}
                setCurrentUser(data);
            })
            .catch(err => console.log(err));
        }
    // eslint-disable-next-line
    }, [])

    if (currentUser) {

        return (
            <>
            <SignInIntroduction />
            <StepperComponent step={-1} childrenArray={fakeChildrenArray} />
            <FormChooser currentUser={currentUser} setStep={setStep} />
            </>
        )

    }


    return(
        <>
        <SignInIntroduction />
        <StepperComponent step={-1} childrenArray={fakeChildrenArray} />
            <div className="text-center margin-bottom-20">
            { getCurrentMode() === MODE_REACT_ONLY && <button type="button" onClick={getFakeUser} className="btn btn-secondary">React Only Login</button> } 
            
            { getCurrentMode() === MODE_REACT_API && <a href="/login" className="btn btn-secondary">Sign In</a>}
            <a href="https://accounts.eclipse.org/" className="btn btn-secondary">Create an account</a>
            </div>
        </>
    )
}

export default SignIn