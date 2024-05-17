import classNames from "classnames";
import { useSelector } from "react-redux";

import { getTemplates } from "../../../../store/state.selector";

import {
    Container,
    Content,
    Image,
    ImageWrapper,
    Section,
    Text,
    TextContent,
    Title,
} from "./whoWeAre.styled";

export const WhoWeAre = () => {
    const templates = useSelector(getTemplates);
    console.warn(">>> Home", templates);

    return (
        <Section data-testid="WhoWeAre">
            <Container>
                <Title>Qui sommes-nous ?</Title>
                <Content className={classNames({
                    isReversed: false
                })}>
                    <ImageWrapper>
                        <Image src="https://changemavie.com/wp-content/uploads/2024/02/equipe-1.jpg" />
                    </ImageWrapper>
                    <TextContent>
                        <Text className={classNames({
                            isCentered: false
                        })}>Nous vous présentons l’équipe de coaches certifiées qui vous accompagnera tout au long de votre transformation si vous rejoignez le programme de coaching Change ma vie : Mode d’emploi !</Text>
                    </TextContent>
                </Content>
            </Container>
        </Section>
    );
};
