'use client'
import React, { useState, useEffect} from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Card, Space } from 'antd'
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const { Header, Content, Footer } = Layout;

export default function NavBar({ nome, data }) {
  const [screenWidth, setScreenWidth] = useState(null);

  const getContainerStyles = (screenWidth) => {

    let maxHeight = 380;
  
    if (screenWidth <= 768) {
      maxHeight = 380;
    }
  
    if (screenWidth <= 400) {
      maxHeight = 720;
    }
  
    return {
      padding: '24px 5px',
      maxHeight: maxHeight,
      minHeight: 380,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
  }
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dataParse = JSON.parse(data)

  const menuItems = [
    {
      key: '1',
      label: <OrganizationSwitcher appearance={{baseTheme: dark}} />
    },
    {
      key: '2',
      label: <UserButton afterSignOutUrl='/sign-in'/>
    }
  ];

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="demo-logo" />
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectable = {false}
            style={{ border: 'none', flex: 1 }}
            items={menuItems.slice(0, 1)}
          />
          <div style={{ margin: '0 8px' }} /> 
          <Menu
            theme="dark"
            mode="horizontal"
            selectable= {false}
            style={{ border: 'none', margin: '0 8px' }}
            items={menuItems.slice(1, 2)}
          />
          <div style={{ margin: '0 8px' }} /> 
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            style={{ border: 'none', margin: '0 8px' }}
            items={menuItems.slice(2)}
          />
        </div>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={[
          { title: 'Home' },
          { title: 'Consultor' },
          { title: `${nome}` }
        ]} />
       <div style={getContainerStyles(screenWidth)}>
    <div style={{ margin: '0 auto', maxWidth: 300 }}>
        <Space direction="vertical" size={16}>
            {dataParse.map((item) => (
                <Card size="small" title={item.categoria} extra={<a href={`/info/${item.id}`}>detalhes</a>} key={item.id} style={{ width: 300 }}>
                   <p>OS : {item.os} </p>
                   <p>AJUSTAR : {item.erro}</p>
                   <p>DATA : <span style={{ fontSize: '12px' }}>{new Date(item.data).toLocaleDateString()} às {new Date(item.data).toLocaleTimeString()}</span></p>
                   <p>STATUS : <span style={{ color: item.check ? 'green' : 'red' }}>{item.check ? "Concluído" : "Pendente"}</span></p> 
                </Card>
            ))}
        </Space>
    </div>
</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Victor Fazekas
      </Footer>
    </Layout>
  )
}
