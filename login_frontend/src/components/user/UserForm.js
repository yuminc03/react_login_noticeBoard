import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */

const UserFormBlock = styled.div`
    h3{
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

/**
 * 스타일링된 input 
 */

const SytledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[5]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        a:hover {
            color: ${palette.gray[9]};

        }
    }
`;

const ButtonWidthMarginTop = styled(Button)`
    margin-top: 1rem;
`;
const textMap = {
    login: '로그인',
    register: '회원가입',
};

const UserForm = ({type, form, onChange, onSubmit}) =>{
    const text = textMap[type];
    return (
        <UserFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <SytledInput 
                    autoComplete="username" 
                    name="username" 
                    placeholder="아이디"
                    onChange={onChange}
                    value={form.username}
                />
                <SytledInput
                    autoComplete="new_password" 
                    name="password" 
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />
                {type === 'register' && (
                    <SytledInput
                    autoComplete="new-password"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    />
                )}
                <ButtonWidthMarginTop cyan fullWidth>
                    {text}
                </ButtonWidthMarginTop>
                {/* <Button cyan={true} fullwidth={true}/>와 같은 의미 */}
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">회원가입</Link>
                ) : (
                    <Link to="/login">로그인</Link>
                )}
            </Footer>
        </UserFormBlock>
    );
};

export default UserForm;