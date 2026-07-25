import { MailIcon } from './Icons'

export default function Toast({ visible }: { visible: boolean }) {
  return (
    <div className={`toast ${visible ? 'visible' : ''}`} role="status">
      <MailIcon />
      email copied to clipboard
    </div>
  )
}
