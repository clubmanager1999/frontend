import { ReactNode } from 'react';

interface NoSubmitFormProps {
  children?: ReactNode;
}

export default function NoSubmitForm(props: NoSubmitFormProps) {
  return <form onSubmit={(e) => e.preventDefault()}>{props.children}</form>;
}
