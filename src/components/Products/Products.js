import React, { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Spinner, Table } from 'react-bootstrap';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 10;

    // For Add to Cart
    const handleAddToCart = product => {
        if (cart.indexOf(product)) {
            product.qty += 1;

            // Update Product in Server
            fetch(`http://localhost:5000/cart/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(res => res.json())
                .then(data => {
                    setCart(data);
                });

        }

        else {
            product.qty = 1;
            // POST CART IN SERVER
            fetch(`http://localhost:5000/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(res => res.json())
                .then(data => {
                    setCart(data);
                });
        };
    };

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

    useEffect(() => {
        fetch(`http://localhost:5000/cart`)
            .then(res => res.json())
            .then(data => setCart(data));
    }, [cart]);

    return (
        <Container className="my-5">
            {/* For Spinner */}
            <div className="text-center">
                {products.length === 0 ? <Spinner className="mx-auto my-5" animation="grow" variant="primary" /> : null}
            </div>

            <Row className="g-4">
                <Col xs={12} md={9}>
                    <h6 className="display-6 text-center mb-3">Products</h6>
                    <Row xs={1} md={3} className="g-4">
                        {
                            products.map(product => <Product
                                key={product.key}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            >

                            </Product>)
                        }
                    </Row>

                    {/* Pagination */}
                    <div className="my-3 d-flex justify-content-center">
                        <Pagination>
                            {items}
                        </Pagination>
                    </div>
                </Col>

                <Col xs={12} md={3}>
                    <h6 className="display-6 text-center mb-3">Cart</h6>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>QTY</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cart.length > 0 ? cart.map(pd => {
                                    return (
                                        <tr>
                                            <td>
                                                {cart.indexOf(pd) + 1}
                                            </td>

                                            <td>
                                                {pd.name}
                                            </td>

                                            <td>
                                                {pd.qty}
                                            </td>

                                            <td>
                                                {pd.price * pd.qty}
                                            </td>
                                        </tr>
                                    );
                                }) : null
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;