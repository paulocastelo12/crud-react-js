import React from 'react'

import Main from '../template/Main'

export default (props) => {
    return (
        <Main icon="home" title="Início"
            subtitle="Crud React Js c/ Spring boot Java (PostgreSQL).">
            <div className="display-4">Bem vindo</div>
            <hr />
            <p className="mb-0">
                Sistema para exemplificar a construção de um cadastro desenvolvido em React
            </p>
        </Main>
    )
}