'use client'
import React, { useEffect } from 'react';
import { HomeOutlined, PieChartOutlined, ToolOutlined, TeamOutlined  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

export default function NavBar({ children, filial }) {
  const router = useRouter();



  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (

    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
        }}
        onCollapse={(collapsed, type) => {
        }}
      >
        <div className="demo-logo-vertical" />

        <Menu style={{
            paddingTop: 30,
        }} 
        theme="dark" mode="inline" defaultSelectedKeys={['2']} items={[
          {
            label: (
            <UserButton afterSignOutUrl='/' />
            ),
            key: 'element1',
        },
        {
          label: (
            <a href='/menu'>Menu</a>
          ),
          key: 'element2',
          icon: <HomeOutlined style={{
            fontSize: 20
          }} />
        },
        {
          label: (
            <a href='/formconsultor'>Form Consultor</a>
          ),
          key: 'element3',
          icon: <TeamOutlined style={{
            fontSize: 20
          }}/>
        },
        {
            label: (
              <a href='formtecnico'>Form Técnico</a>
            ),
            key: 'element4',
            icon: <ToolOutlined style={{
              fontSize: 20
            }} />
        },
        {
          label:(
            <a href='/dashboard'>DashBoard</a>
          ),
          key: 'element5',
          icon: <PieChartOutlined style={{
            fontSize: 20
          }} />
        }
        ]} />
        
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingLeft: 20,
            background: colorBgContainer,
          }}
        > 
          <span style={{ marginRight: 10}}>{filial.toUpperCase()}</span>
            <div style={{ display: 'inline-flex', paddingTop: '10px', height:'32px' }}> 
              <span style={{ marginRight: 10 }}> 
              <img
              style={{ width: 'auto', height: 'auto', maxWidth: 50, maxHeight: 50 }}
              src="/pateo.png"
              alt="logoPateo"
                />
          </span>
        </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: '74.2vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Victor Fazekas
        </Footer>
      </Layout>
    </Layout>
  );
};