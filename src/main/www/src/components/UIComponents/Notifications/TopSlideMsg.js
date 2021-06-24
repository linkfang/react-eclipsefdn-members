import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function TopSlideMsg({ shouldShowUp, msgContent }) {
  return (
    <div className={shouldShowUp ? 'msg-popup msg-popup-show' : 'msg-popup'}>
      <ErrorOutlineIcon style={{ color: '#cf2020', fontSize: 30 }} />
      <span>{msgContent}</span>
    </div>
  );
}
