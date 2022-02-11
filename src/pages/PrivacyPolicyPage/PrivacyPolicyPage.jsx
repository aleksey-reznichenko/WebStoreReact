import React from 'react';
import {Box, Container, Link, Typography, useMediaQuery} from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs";
import {FullBlock} from "./FullBlock";
import {BlockPolicy} from "./BlockPolicy";

const PrivacyPolicy = () => {
    const matches = useMediaQuery('(max-width:768px)');
    return (
        <>
            <Breadcrumbs links={['privacy policy']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: '300px'
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            width: '100%',
                            backgroundColor: '#fff',
                            padding: matches ? '40px 0 20px 0' : '50px 0px'
                        }}
                    >
                        <Container maxWidth="md">
                            <Typography
                                variant={matches ? 'h4': 'h3'}
                                letterSpacing='10px'
                                textAlign='center'
                                fontWeight='400'
                                marginBottom={matches ? '30px': '40px'}
                            >
                                PRIVACY POLICY
                            </Typography>
                            <FullBlock title='WHO I AM' breakpoint={matches} children={
                                <>
                                    My website address is:
                                    <Link
                                        href='https://www.linkedin.com/in/aleksey-reznichenko/'
                                        target="_blank"
                                        color='#000'
                                        marginLeft='5px'
                                        noWrap={false}
                                        fontSize={matches ? '14px' : '16px'}
                                    >
                                        https://www.linkedin.com/in/aleksey-reznichenko
                                    </Link>
                                </>
                            }/>
                            <FullBlock title='WHAT PERSONAL DATA WE COLLECT' breakpoint={matches} children={
                                <>
                                    <BlockPolicy title='COMMENTS' breakpoint={matches} children={
                                        <>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem delectus distinctio dolore dolorem, eos itaque laboriosam praesentium quas quia, rem, soluta voluptatem? Exercitationem, nesciunt!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis debitis id quaerat. Ad beatae enim eos illo in non pariatur quos, repudiandae sint temporibus, vel vitae voluptas! Commodi cum earum ex fuga, fugit ipsam nam provident recusandae rerum soluta. Corporis debitis eaque eum iure perspiciatis tenetur voluptate. Quasi, qui similique.</p>
                                        </>
                                    }/>
                                    <BlockPolicy title='MEDIA' breakpoint={matches} children={
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem delectus distinctio dolore dolorem, eos itaque laboriosam praesentium quas quia, rem, soluta voluptatem? Exercitationem, nesciunt!</p>
                                    }/>
                                    <BlockPolicy title='COOKIES' breakpoint={matches} children={
                                        <>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat natus obcaecati perferendis porro quod ut voluptate? Commodi dolores eligendi, enim eos est, excepturi expedita iure, nostrum repellendus voluptatem voluptates.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis debitis id quaerat. Ad beatae enim eos illo in non pariatur quos, repudiandae sint temporibus, vel vitae voluptas! Commodi cum earum ex fuga, fugit ipsam nam provident recusandae rerum soluta. Corporis debitis eaque eum iure perspiciatis tenetur voluptate. Quasi, qui similique.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto culpa cumque error exercitationem explicabo itaque laboriosam nemo nihil, pariatur perspiciatis porro quasi reprehenderit ut vel veniam voluptatibus voluptatum. A ad ea, expedita ipsum libero magni numquam suscipit totam? Accusamus amet aspernatur at dolores expedita ipsum necessitatibus officia pariatur quisquam.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet aspernatur dolor fuga illum in inventore labore neque nostrum tenetur.</p>
                                        </>
                                    }/>
                                    <BlockPolicy title='EMBEDDED CONTENT FROM OTHER WEBSITES' breakpoint={matches} children={
                                        <>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam aspernatur assumenda consequuntur corporis culpa debitis dolorem eaque eos facilis libero magni mollitia natus, nobis quae quasi quo repellendus saepe sed tempora? Assumenda consequuntur, dolorem eligendi eos quod saepe voluptatibus!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis debitis id quaerat. Ad beatae enim eos illo in non pariatur quos, repudiandae sint temporibus, vel vitae voluptas! Commodi cum earum ex fuga, fugit ipsam nam provident recusandae rerum soluta. Corporis debitis eaque eum iure perspiciatis tenetur voluptate. Quasi, qui similique.</p>
                                        </>
                                    }/>
                                </>
                            }/>
                        </Container>
                    </Box>
                </Container>
            </main>
        </>
    )
}
export default PrivacyPolicy
