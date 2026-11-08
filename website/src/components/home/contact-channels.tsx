import { site } from "@/data/site";

type ContactChannelsProps = { withNote?: boolean };

/**
 * Enquiry channels for the house, shared by the homepage contact card and the
 * information page contact section so both stay in step.
 */
export function ContactChannels({ withNote = true }: ContactChannelsProps) {
  return (
    <div className="contact">
      <dl className="contact__list">
        {site.contact.channels.map((channel) => (
          <div className="contact__item" key={channel.label}>
            <dt className="caption contact__label">{channel.label}</dt>
            <dd className="contact__detail">{channel.detail}</dd>
          </div>
        ))}
      </dl>
      {withNote ? <p className="contact__note">{site.contact.note}</p> : null}
    </div>
  );
}
