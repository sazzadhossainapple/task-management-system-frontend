import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <Row>
                <Col>
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <h2 className="mb-3">Oops! Page Not Found</h2>
                    <p className="text-muted">
                        The page you are looking for might have been removed,
                        had its name changed, or is temporarily unavailable.
                    </p>
                    <Link to="/">
                        <Button
                            variant="primary"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            className="mt-3"
                        >
                            Go Back Home
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Error;
