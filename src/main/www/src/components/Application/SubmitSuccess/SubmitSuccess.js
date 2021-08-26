import { useEffect } from 'react';
import { scrollToTop } from '../../../Utils/formFunctionHelpers';

/**
 * This is just a pure html component to
 * display after all steps finished and
 * final submitted after preview
 */
const SubmitSuccess = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <h1 className="fw-600 h2">Confirmation message on submission: </h1>
      <p>We thank you for completing the application process.</p>
      <p>As next steps,</p>
      <ol>
        <li>
          <p>
            You will receive an automated email capturing the information you have provided. Please review this
            information, and let us know of any errors or changes required by emailing{' '}
            <a href="mailto:membership.coordination@eclipse-foundation.org">
              membership.coordination@eclipse-foundation.org
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            Within the next two business days, our membership coordination team will send via HelloSign’s document
            signature system the membership documents to be executed.
            <ol type="a">
              <li>
                If you are the signing authority indicated on the application, then the documents will be sent directly
                to you.
              </li>
              <li>
                If you indicated someone else in your organization is the signing authority, our membership coordination
                team will let you know of the status of the signing process - but the documents will be sent directly to
                the signing authority.
              </li>
            </ol>
          </p>
        </li>
        <li>
          Once the membership document(s) are executed by your organization, the Eclipse Foundation’s Executive Director
          will countersign and the completed documents will be returned to you by our membership coordination team. They
          will also begin the ongboarding walk you and your other team members through our onboarding process.
        </li>
      </ol>
      <p>
        If you have any questions, or have not received notification of the signing process being underway after 2
        business days, please contact{' '}
        <a href="mailto:membership.coordination@eclipse-foundation.org">
          membership.coordination@eclipse-foundation.org
        </a>
        .
      </p>
    </>
  );
};

export default SubmitSuccess;
