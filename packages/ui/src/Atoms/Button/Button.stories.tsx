import { Button, ButtonProps } from './Button';

export default {
    title: 'Atoms/Button',
    component: Button,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['text', 'outlined', 'contained'],
            },
        },
    },
};

export const Default = (args: ButtonProps) => <Button {...args} />;
Default.args = {
    children: 'Button',
};