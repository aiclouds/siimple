import React from "react";
import {Code, Heading, Paragraph, Pre} from "neutrine/lib/components";
import {Icon} from "neutrine/lib/components";
import {Btn} from "neutrine/lib/components";
import {Row, Column} from "neutrine/lib/components";
import {ModalWrapper, ModalBody, ModalFooter} from "neutrine/lib/components";

//Preview icon
export function PreviewIcon (props) {
    return (
        <ModalWrapper size="medium" onClose={props.onClose} title={props.icon}>
            <ModalBody className="siimple--bg-light1">
                <Row className="siimple--mb-0">
                    <Column size="4" medium="12">
                        <div className="siimple--border-rounded siimple--bg-white siimple--py-4" align="center">
                            <Icon icon={props.icon} size="120px" />
                        </div>
                    </Column>
                    <Column size="8" medium="12">
                        <Heading type="h4">How to use this icon</Heading>
                        <Paragraph className="siimple--mb-1">
                            Before start using this icon, make sure you have installed <strong>siimple-icons</strong> in yout project. 
                            Then, copy the following <strong>HTML</strong> code to use this icon:
                        </Paragraph>
                        <Pre>&lt;i class="siimple-icon siimple-icon-{props.icon}"&gt;&lt;/i&gt;</Pre>
                        <Paragraph className="siimple--mb-1">
                            Use the <Code>style</Code> attribute to customize this icon.
                            For example, use the <Code>font-size</Code> property to change the size:
                        </Paragraph>
                        <Pre>&lt;i class="siimple-icon siimple-icon-{props.icon}" style="font-size:20px"&gt;&lt;/i&gt;</Pre>
                    </Column>
                </Row>
            </ModalBody>
            <ModalFooter align="right" className="siimple--bg-light1">
                <Btn onClick={props.onClose} color="primary" className="siimple--text-bold">Got it!</Btn>
            </ModalFooter>
        </ModalWrapper>
    );
}

