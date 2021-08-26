const SignInIntroduction = () => {
  return (
    <div className="row margin-bottom-20">
      <div className="col-md-8 display-center">
        <img className="img img-responsive" width={360} src="home_arrows_update.png" alt="arrows-icons" />
      </div>
      <div className="col-md-16 margin-top-10">
        <h1>Membership Application Form</h1>
        <p>
          Please complete the Membership Application Form as part of the overall membership application and enrolment
          process. Completion of this Form is a required formal step in the{' '}
          <a href="https://www.eclipse.org/membership/#tab-membership" target="_blank" rel="noreferrer">
            Membership Application Process
          </a>
          .
        </p>
        <p>
          Once you complete and submit this Application Form, we will forward the various legal agreements for
          electronic execution, so please be sure to review these legal documents in advance. For more information,
          please see{' '}
          <a href="https://www.eclipse.org/membership/#tab-membership" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignInIntroduction;
