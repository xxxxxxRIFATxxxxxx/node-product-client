import React, { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);

    // Handle Page Number
    const handlePageNumber = number => {
        setNumberOfPage(number);
    };

    // For pagination
    let active = 2;
    let items = [];
    const pages = Math.ceil(products.length / 10);
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item onClick={() => handlePageNumber(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    };

    useEffect(() => {
        fetch(`http://localhost:5000/products?pageNumber=${numberOfPage}&&size=${numberOfPage * 10}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, []);

    return (
        <Container className="my-5">
            {/* For Spinner */}
            <div className="text-center">
                {products.length === 0 ? <Spinner className="mx-auto my-5" animation="grow" variant="primary" /> : null}
            </div>

            <Row className="g-4">
                <Col xs={1} md={9}>
                    <Row xs={1} md={3} className="g-4">
                        {
                            products.map(product => <Product key={product.key} product={product}></Product>)
                        }
                    </Row>

                    {/* Pagination */}
                    <Pagination>
                        {items}
                    </Pagination>
                </Col>

                <Col xs={1} md={3}>
                    CART
                </Col>
            </Row>
        </Container>
    );
};

export default Products;