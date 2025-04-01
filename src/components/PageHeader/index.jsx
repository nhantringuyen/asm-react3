import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./PageHeader.module.css";

const PageHeader = ({ title, breadcrumb = [] }) => {
    return (
        <section className={styles.headerContainer}>
            <Row className="align-items-center">
                <Col xs={6}>
                    <h2 className={styles.title}>{title}</h2>
                </Col>
                <Col xs={6} className="text-end">
                    {breadcrumb.length > 0 ? (
                        <div className={styles.breadcrumb}>
                            {breadcrumb.map((item, index) => (
                                <span key={index} className={index === breadcrumb.length - 1 ? styles.current : ""}>
                {item} {index < breadcrumb.length - 1 && " / "}
              </span>
                            ))}
                        </div>
                    ) : (
                        <span className={styles.ghostTitle}>{title}</span>
                    )}
                </Col>
            </Row>
        </section>
    );
};

export default PageHeader;
