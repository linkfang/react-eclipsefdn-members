import { Typography } from '@material-ui/core';

export default function DashboardOverview() {
  return (
    <div
      style={{
        paddingTop: 90,
      }}
    >
      <Typography variant="h4">Overview</Typography>
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
            height: 90,
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
            height: 90,
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
            height: 90,
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
            height: 90,
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
