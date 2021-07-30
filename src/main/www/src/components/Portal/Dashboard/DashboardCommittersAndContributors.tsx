import { Typography } from '@material-ui/core';

export default function DashboardCommittersAndContributors() {
  return (
    <div
      style={{
        paddingTop: 90,
        display: 'flex',
        flexDirection: 'column',
      }}
      id="committers-contributors"
    >
      <Typography variant="h4">Committers and Contributors</Typography>

      {
        // below are placeholders
      }

      <div
        style={{
          display: 'flex',
          margin: '40px 0',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '48%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: '48%',
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
                width: '48%',
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

          <div>
            <div
              style={{
                width: '100%',
                height: 80,
                backgroundColor: 'orange',
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

        <div
          style={{
            width: '48%',
            height: 280,
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

      <div>
        <div
          style={{
            width: '100%',
            height: 300,
            backgroundColor: '#DCDFE5',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <h5>Chart 1</h5>
        </div>

        <div
          style={{
            width: '100%',
            height: 300,
            backgroundColor: '#DCDFE5',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Chart 2</h5>
        </div>
      </div>
    </div>
  );
}
