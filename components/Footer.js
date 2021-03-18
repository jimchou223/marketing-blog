import styles from "../styles/Footer.module.css";
const Footer = () => {
  const about = [
    { title: "市場訊息", href: "" },
    { title: "專業知識", href: "" },
    { title: "實務操作", href: "" },
  ];
  const service = [
    { title: "團隊成員", href: "" },
    { title: "常見問題", href: "" },
    { title: "聯絡我們", href: "" },
  ]
  return (
    <footer>
      <div className={styles.linkWrapper}>
        <div className={styles.longLower}>
          <h5>聯絡資訊</h5>
          <ul>
            <li>
              <a>
                <i className="fab fa-instagram-square"></i>
                Instsgram
              </a>
            </li>
            <li>
              <a>
                <i className="fab fa-facebook-square"></i>
                Facebook
              </a>
            </li>
            <li>
              <a>
                <i className="fas fa-envelope"></i>
                Email：jimchou223@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.normalLower}>
          <h5>文章分類</h5>
          <ul>
            {about.map((el, index) => {
              return (
                <li key={index}>
                  <a href={el.href}>{el.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.normalLower}>
          <h5>常用服務</h5>
          <ul>
            {service.map((el, index) => {
              return (
                <li key={index}>
                  <a href={el.href}>{el.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <h5 className="center">&copy; {new Date().getFullYear()} - 海上絲路4.0工作室</h5>
    </footer>
  );
};

export default Footer;
