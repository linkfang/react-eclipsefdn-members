export default function DashboardIntro() {
  // below are placeholders
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: '30%',
          height: 260,
          backgroundColor: '#DCDFE5',
          boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h5>Your Company Logo</h5>
      </div>

      <div
        style={{
          width: '30%',
          height: 260,
          backgroundColor: '#A09C9C',
          boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h5>Your Company Rep</h5>
      </div>

      <div
        style={{
          width: '30%',
          height: 260,
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
  );
}
