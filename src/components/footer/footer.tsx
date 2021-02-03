import React from 'react';
import './footer.scss';
import icon from './assets/github.svg';

interface ILinkProps {
  iconUrl: string,
  value: string,
  href: string,
  classNamePart: string,
}

const authors:ILinkProps[] = [
  {
    iconUrl: icon,
    value: 'Ayaki-coder',
    href: 'https://github.com/Ayaki-coder',
    classNamePart: 'footer',
  },
  {
    iconUrl: icon,
    value: 'AV-Shell',
    href: 'https://github.com/AV-Shell',
    classNamePart: 'footer',
  },
  {
    iconUrl: icon,
    value: 'Angoulema',
    href: 'https://github.com/Angoulema',
    classNamePart: 'footer',
  },
  {
    iconUrl: icon,
    value: 'Ortsukh',
    href: 'https://github.com/Ortsukh',
    classNamePart: 'footer',
  },
];

const Link: React.FC<ILinkProps> = (props: ILinkProps) => {
  const {
    iconUrl, value, href, classNamePart,
  } = props;
  return (
    <a
      className={`${classNamePart}-link`} href={href} target="_blank"
      rel="noreferrer"
    >
      <img className={`${classNamePart}-link-icon`} src={iconUrl} alt="icon" />
      {value}
    </a>
  );
};

const Footer: React.FC = () => {
  function drawLinks() {
    return authors.map((link, index) => <Link key={`${index + 1}index`} {...link} />);
  }
  console.log('i am footer');
  // Component code start
  return (
    <footer className="app-footer footer flex-space-between">
      <div className="footer-links">
        <span>2020-q3</span>
        {drawLinks()}
      </div>
      <div className="footer-course">
        <a
          className="footer-course-link click" href="https://rs.school/js/" target="_blank"
          rel="noreferrer"
        >
          <img src="https://rs.school/images/rs_school_js.svg" alt="RSSchool" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
