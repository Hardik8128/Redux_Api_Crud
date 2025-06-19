import {  useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addData, deleteData, editData, getData } from "../redux/action/AllApi";
import { Form, Button, Table, Container, Row, Col, Image } from 'react-bootstrap';

const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    age: yup.number().positive("Age must be positive").integer("Must be an integer").required("Age is required"),
    gender: yup.string().required("Gender is required"),
    // hobbies: yup.array().min(1, "At least one hobby is required"),
    city: yup.string().required("City is required"),
    image: yup
        .mixed()
        .test("required", "Image is required", value => value && value.length > 0)
}).required();

const Redux_crud = () => {
    const [update, setUpdate] = useState(false);

    let blank = {firstName:'',lastName:'',age:'',city:'',gender:'',hobbies:[],image:null}
    const state = useSelector(state => state.uData)
    // console.log(state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {

        console.log(data)
        data.userImage = data.image[0];
        const formData = new FormData

        for (let key in data) {
            formData.append(key, data[key])
        }
        if (data._id) {
            dispatch(editData(formData))
        }
        else {
            dispatch(addData(formData));
        }
        reset({...blank});

    }

    const edit = (id) => {
        
        setUpdate(true)

        let edit = state.find((x) => x._id == id);
        edit.id = edit._id;
        edit.hobbies = edit.hobbies.split(',');
        // console.log(edit)

        reset({ ...edit });
    }

    const kadho = (id) => {
        dispatch(deleteData(id));
    }
    return (
         <Container className="my-5">
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow bg-light">

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">First Name</Form.Label>
                        <Form.Control {...register("firstName")} placeholder="Enter first name" />
                        <Form.Text className="text-danger">{errors.firstName?.message}</Form.Text>
                    </Col>

                    <Col md={6}>
                        <Form.Label className="fw-bold">Last Name</Form.Label>
                        <Form.Control {...register("lastName")} placeholder="Enter last name" />
                        <Form.Text className="text-danger">{errors.lastName?.message}</Form.Text>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Age</Form.Label>
                        <Form.Control type="number" {...register("age")} placeholder="Enter age" />
                        <Form.Text className="text-danger">{errors.age?.message}</Form.Text>
                    </Col>

                    <Col md={6}>
                        <Form.Label className="fw-bold">City</Form.Label>
                        <Form.Control {...register("city")} placeholder="Enter city" />
                        <Form.Text className="text-danger">{errors.city?.message}</Form.Text>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Gender</Form.Label>
                        <div className="d-flex gap-3">
                            <Form.Check type="radio" label="Male" value="male" {...register("gender")} />
                            <Form.Check type="radio" label="Female" value="female" {...register("gender")} />
                        </div>
                        <Form.Text className="text-danger">{errors.gender?.message}</Form.Text>
                    </Col>

                    <Col md={6}>
                        <Form.Label className="fw-bold">Hobbies</Form.Label>
                        <div className="d-flex gap-3 flex-wrap">
                            <Form.Check type="checkbox" label="Shopping" value="Shopping" {...register("hobbies")} />
                            <Form.Check type="checkbox" label="Sport" value="Sport" {...register("hobbies")} />
                            <Form.Check type="checkbox" label="Gaming" value="Gaming" {...register("hobbies")} />
                        </div>
                        <Form.Text className="text-danger">{errors.hobbies?.message}</Form.Text>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label className="fw-bold">Upload Image</Form.Label>
                        <Form.Control type="file" {...register("image")} />
                        <Form.Text className="text-danger">{errors.image?.message}</Form.Text>
                    </Col>
                </Row>

                <div className="text-center">
                    <Button type="submit" variant={update ? "warning" : "primary"}>
                        {update ? "Update" : "Submit"}
                    </Button>
                </div>
            </Form>

            <h3 className="text-center mt-5">User Data</h3>
            <Table striped bordered hover responsive className="mt-3 shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state?.map((x, i) => (
                        <tr key={i}>
                            <td>{x._id}</td>
                            <td>
                                <Image src={x.image} alt="profile" width={50} height={50} roundedCircle />
                            </td>
                            <td>{x.firstName}</td>
                            <td>{x.lastName}</td>
                            <td>{x.age}</td>
                            <td>{x.gender}</td>
                            <td>{x.hobbies}</td>
                            <td>{x.city}</td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => edit(x._id)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => kadho(x._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Redux_crud
