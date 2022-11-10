
const Blog = ({ name, posts }) => {

    const styles = {'paddingLeft': '20px'}

    return(
        <div>
            <h1 style={styles}>Blog</h1>
            <p style={styles}> Blod do { name }</p>

            <ul>
                {posts.map(post => 
                    <li key={post.id}>{post.id} {post.title}</li>
                )}
            </ul>
        </div>
    )
}

export const getStaticProps = async () => {

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const posts = await res.json()

    return {
        props: {
            name: 'Wellington',
            posts: posts
        },
        revalidate: 10
    }
}

export default Blog
