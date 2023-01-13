import React from 'react';
import Contact from './contact';

const PHONE_NUMBER = '+380956095379';

const CONTACTS = [
  {
    alt: 'Phone',
    imgSrc: '/assets/images/smartphone.svg',
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`
  },
  {
    alt: 'Viber',
    imgSrc: '/assets/images/telegram.svg',
    value: PHONE_NUMBER,
    href: `https://t.me/${PHONE_NUMBER}`
  }
];

const Contacts = ({ className }) => {
  return (
    <div className={className}>
      {CONTACTS.map((contact) => (
        <Contact key={contact.alt} {...contact} />
      ))}
    </div>
  );
};

export default Contacts;
