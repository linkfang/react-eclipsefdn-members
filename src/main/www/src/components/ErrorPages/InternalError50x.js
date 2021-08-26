import { Button } from "@material-ui/core";

export default function InternalError50x() {
  return (
    <div className="margin-bottom-20">
      <h1>An unexpected error occurred</h1>
      <p>Sorry, the page you are looking for is currently unavailable.</p>
      <p>Please try again later.</p>
      <Button variant="contained" color="primary" onClick={() => window.location.assign(window.location.origin)}>
        Return to Homepage
      </Button>
    </div>
  );
}
