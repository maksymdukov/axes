import React from "react";
import Contact from "./contact";

const PHONE_NUMBER = "+380662906866";
const SKYPE = "latency0007";

const CONTACTS = [
  {
    alt: "Phone",
    imgSrc: "/assets/images/smartphone.svg",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`
  },
  {
    alt: "Viber",
    imgSrc: "/assets/images/viber.svg",
    value: PHONE_NUMBER,
    href: `viber://add?number=${PHONE_NUMBER}`
  },
  {
    alt: "Skype",
    imgSrc: "/assets/images/skype.svg",
    value: SKYPE,
    href: `skype:${SKYPE}?call`
  }
];

const Contacts = ({ className }) => {
  return (
    <div className={className}>
      {CONTACTS.map(contact => (
        <Contact key={contact.alt} {...contact} />
      ))}
    </div>
  );
};

export default Contacts;
