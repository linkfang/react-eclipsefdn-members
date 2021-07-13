import { Typography } from '@material-ui/core';

export default function ContactManagement() {
  return (
    <div
      style={{
        margin: '40px 0',
      }}
    >
      <Typography variant="h4">Contact Management</Typography>

      {
        // below are placeholders
      }
      <div
        style={{
          display: 'flex',
          margin: '20px 0 60px',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '48%',
            height: 260,
            backgroundColor: '#DCDFE5',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Fields 1</h5>
        </div>

        <div
          style={{
            width: '48%',
            height: 260,
            backgroundColor: '#A09C9C',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Fields 2</h5>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: 260,
          backgroundColor: '#DCDFE5',
          boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h5>Table</h5>
      </div>
    </div>
  );
}
