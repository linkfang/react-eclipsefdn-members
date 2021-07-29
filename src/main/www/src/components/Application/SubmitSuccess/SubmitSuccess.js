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
      <p>We thank you for completing the membership application.</p>
      <p>
        Our membership coordination team will send a ready to sign membership
        documents to the signing authority. If you have not received the
        ready-to-sign agreement within 2 business days, please contact{' '}
        <a href="mailto:membership.coordination@eclipse-foundation.org">
          membership.coordination@eclipse-foundation.org
        </a>
      </p>
    </>
  );
};

export default SubmitSuccess;
