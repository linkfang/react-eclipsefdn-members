import { Typography } from '@material-ui/core';

export default function DashboardResources() {
  return (
    <div
      style={{
        paddingTop: 90,
      }}
      id="resources"
    >
      <Typography variant="h4">Resources</Typography>

      {
        // below are placeholders
      }

      <div
        style={{
          display: 'flex',
          marginTop: 40,
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '22%',
            height: 180,
            backgroundColor: '#fff',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Lorem Ipsum</h5>
        </div>

        <div
          style={{
            width: '22%',
            height: 180,
            backgroundColor: '#fff',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Lorem Ipsum</h5>
        </div>

        <div
          style={{
            width: '22%',
            height: 180,
            backgroundColor: '#fff',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Lorem Ipsum</h5>
        </div>

        <div
          style={{
            width: '22%',
            height: 180,
            backgroundColor: '#fff',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Lorem Ipsum</h5>
        </div>
      </div>
    </div>
  );
}
