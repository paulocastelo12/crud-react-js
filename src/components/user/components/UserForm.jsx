import React, { Component } from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:8080/api/usersmodel";
const initialState = {
    user: {
        nomeusuario: '',
        loginusuario: '',
        ativo: true,
        senhausuario: ''
    }
}
export default class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.usuario
        }
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.idusuario}` : baseUrl

        //console.log(user);
        axios[method](url, user, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Content-Type": "application/json;charset=UTF-8"
            },
        }).then(resp => {
            this.props.afterSave(resp.data)
            this.setState({ user: initialState.user})
        }).catch(function (error) {
            console.log(error);
        });
    }


    render() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control"
                                name="nomeusuario"
                                value={this.state.user.nomeusuario}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="form-group col-12 col-md-3">
                        <label>Login:</label>
                        <input type="text" className="form-control"
                            name="loginusuario"
                            value={this.state.user.loginusuario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Login"
                        />
                    </div>
                    <div className="form-group col-12 col-md-3">
                        <label>Senha:</label>
                        <input type="password" className="form-control"
                            name="senhausuario"
                            value={this.state.user.senhausuario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a senha"
                        />
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}