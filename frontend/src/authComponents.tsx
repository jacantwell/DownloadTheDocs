import { useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import { Button, Heading, Image, Text, View } from '@aws-amplify/ui-react';
import {Row, Col } from "reactstrap";
import './index.css';

// const digiLabIconURI = Image.resolveAssetSource(digiLabIcon).uri;

export const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Row>
                    <Col className="text-center">
                        <h1 className='twinlab'>twinLab</h1>
                    </Col>
                </Row>
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        // The padding here is a temporal fix to the white space at the bottom
        <View textAlign="center" padding={150}> 
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign In to your Account
          </Heading>
        );
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
              variation="link"
            >
              Reset Password
            </Button>
          </View>
        );
      },
    },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a New Account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Back to Sign In
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    SetupTotp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ForgotPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  };
  
export const formFields = {
    signIn: {
      username: {
        label: 'Email',
        placeholder: 'Enter Your Email',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter Your Password',
      },
    },
    signUp: {
    username: {
        label: 'Email:',
        placeholder: 'Enter Your Email',
        order: 1,
    },
     password: {
        label: 'Password:',
        placeholder: 'Enter Your Password',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        label: 'Confirm Your Password',
        placeholder: 'Enter Your Password Again',
        order: 3,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Enter Your Password:',
      },
    },
    forgotPassword: {
      username: {
        placeholder: 'Enter Your Email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter Your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Enter Your Password:',
      },
    },
    setupTotp: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter Your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'Confirmation Code',
        placeholder: 'Enter Your Confirmation Code:',
        isRequired: false,
      },
    },
  };
  