import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Product = props => {
    const { name, img, price } = props.product;

    return (
        <Col>
            <Card>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Card.Text className="bg-primary">
                        <h4 className="text-white display-6 text-center p-2">$ {price}</h4>
                    </Card.Text>

                    <button className="btn btn-success w-100">Add to cart</button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Product;