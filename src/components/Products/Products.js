import React, { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 10;

    // For pagination
    const handlePageNumber = number => {
        setProducts([]);
        setCurrentPage(number);
    };

    let active = currentPage;
    let items = [];
    for (let number = 1; number < numberOfPage; number++) {
        items.push(
            <Pagination.Item onClick={() => handlePageNumber(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    };

    useEffect(() => {
        fetch(`http://localhost:5000/products?currentPage=${currentPage}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                const pages = Math.ceil(data.count / size);
                setProducts(data.productsArray);
                setNumberOfPage(pages)
            });
    }, [currentPage]);

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