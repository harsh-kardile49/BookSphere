const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>© {currentYear} BookSphere. All Rights Reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
