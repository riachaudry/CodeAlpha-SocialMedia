const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

let posts = [
    {
        id: 1,
        username: "Swati Srivastava (CEO)",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        time: "2 hours ago",
        content: "Thrilled to see amazing full-stack web development projects submitted by our CodeAlpha interns this week! Keep up the brilliant work.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        likes: 42,
        comments: [
            { user: "Rahat Maqsood", text: "Thank you so much! Working hard on the tasks." },
            { user: "Ayaan Khan", text: "CodeAlpha learning experience is top notch!" }
        ]
    },
    {
        id: 2,
        username: "Rahat Maqsood",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        time: "4 hours ago",
        content: "Just completed Task 2 Social Media Platform for my CodeAlpha Full Stack Internship (Student ID: CA/DF1/251199). Excited for Task 3!",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        likes: 19,
        comments: [
            { user: "CodeAlpha Official", text: "Fantastic work Rahat!" }
        ]
    }
];

app.get('/', (req, res) => {
    let postsHtml = posts.map(p => `
        <div class="post-card">
            <div class="post-header">
                <img src="${p.avatar}" alt="Avatar">
                <div>
                    <h4>${p.username}</h4>
                    <span class="post-time">${p.time}</span>
                </div>
            </div>
            <div class="post-body">
                <p>${p.content}</p>
                ${p.image ? `<img src="${p.image}" class="post-img" alt="Post Image">` : ''}
            </div>
            <div class="post-stats">
                <span>❤️ ${p.likes} Likes</span>
                <span>💬 ${p.comments.length} Comments</span>
            </div>
        </div>
    `).reverse().join('');

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Alpha Social Media</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                body { background-color: #f0f2f5; color: #333; }
                
                header { background: #ffffff; padding: 12px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
                .logo { font-size: 1.5rem; font-weight: 800; color: #1a237e; }
                .logo span { color: #ad1457; }
                .nav-profile { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.95rem; color: #444; }
                .nav-profile img { width: 35px; height: 35px; border-radius: 50%; object-fit: cover; }

                .container { max-width: 1000px; margin: 25px auto; display: flex; gap: 30px; padding: 0 15px; justify-content: center; }
                .sidebar-left { width: 280px; background: white; border-radius: 12px; padding: 20px; height: fit-content; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
                .feed-center { flex: 1; max-width: 650px; }

                .sidebar-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; text-decoration: none; color: #333; font-weight: 600; margin-bottom: 5px; cursor: pointer; transition: 0.2s; }
                .sidebar-item:hover { background: #fce4ec; color: #ad1457; }

                .create-post { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; }
                .create-post textarea { width: 100%; border: 1px solid #ddd; border-radius: 8px; padding: 12px; resize: none; font-size: 1rem; outline: none; background: #f8fafc; }
                .create-post textarea:focus { border-color: #ad1457; background: white; }
                .post-btn-container { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
                .create-post button { background: #ad1457; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; }
                .create-post button:hover { background: #880e4f; }

                .post-card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; padding: 20px; }
                .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
                .post-header img { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; }
                .post-header h4 { font-size: 1rem; color: #222; }
                .post-time { font-size: 0.8rem; color: #777; }
                .post-body p { font-size: 0.95rem; line-height: 1.5; color: #444; margin-bottom: 12px; }
                .post-img { width: 100%; max-height: 350px; object-fit: cover; border-radius: 8px; margin-bottom: 12px; }
                .post-stats { display: flex; justify-content: space-between; font-size: 0.85rem; color: #666; border-top: 1px solid #eee; padding-top: 8px; }

                .tab-content { display: none; }
                .tab-content.active { display: block; }
                .profile-box { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center; }
                .profile-box img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid #ad1457; }
            </style>
        </head>
        <body>

            <header>
                <div class="logo">Code Alpha <span>Social Media</span></div>
                <div class="nav-profile">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Profile">
                    <span>Rahat Maqsood (CA/DF1/251199)</span>
                </div>
            </header>

            <div class="container">
                <!-- Left Sidebar -->
                <div class="sidebar-left">
                    <div class="sidebar-item" onclick="switchTab('home')">🏠 Home Feed</div>
                    <div class="sidebar-item" onclick="switchTab('profile')">👤 My Profile</div>
                    <div class="sidebar-item" onclick="switchTab('notifications')">🔔 Notifications <span style="background:#ad1457; color:white; padding:2px 6px; border-radius:10px; font-size:0.75rem;">3</span></div>
                    <div class="sidebar-item" onclick="switchTab('messages')">💬 Messages</div>
                    <div class="sidebar-item" onclick="switchTab('analytics')">📊 Internship Analytics</div>
                    <div class="sidebar-item" onclick="switchTab('settings')">⚙️ Settings</div>
                </div>

                <!-- Center Main Dynamic Area -->
                <div class="feed-center">
                    
                    <!-- HOME TAB -->
                    <div id="tab-home" class="tab-content active">
                        <div class="create-post">
                            <form action="/add-post" method="POST">
                                <textarea name="content" rows="3" placeholder="What's on your mind, Rahat? Share your internship update..."></textarea>
                                <div class="post-btn-container">
                                    <span style="font-size:0.85rem; color:#666;">📷 Add Photo / Tag CodeAlpha</span>
                                    <button type="submit">Post</button>
                                </div>
                            </form>
                        </div>
                        ${postsHtml}
                    </div>

                    <!-- PROFILE TAB -->
                    <div id="tab-profile" class="tab-content">
                        <div class="profile-box">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Rahat">
                            <h2>Rahat Maqsood</h2>
                            <p style="color: #666; margin-top: 5px;">Full Stack Web Development Intern</p>
                            <p style="color: #ad1457; font-weight: bold; margin-top: 5px;">Student ID: CA/DF1/251199</p>
                            <hr style="margin: 20px 0; border:0; border-top:1px solid #eee;">
                            <p style="text-align: left; color: #444; line-height: 1.6;"><strong>About:</strong> Passionate e-commerce store manager and aspiring full-stack developer. Successfully completing CodeAlpha virtual internship tasks with dedication.</p>
                        </div>
                    </div>

                    <!-- NOTIFICATIONS TAB -->
                    <div id="tab-notifications" class="tab-content">
                        <div class="profile-box" style="text-align: left;">
                            <h3>Notifications</h3>
                            <div style="margin-top: 15px; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 10px;">⭐ <strong>Swati Srivastava (CEO)</strong> liked your Task 1 submission. <span style="font-size: 0.75rem; color: #777; float: right;">10m ago</span></div>
                            <div style="margin-top: 10px; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 10px;">💬 <strong>CodeAlpha Official</strong> reviewed your social feed post. <span style="font-size: 0.75rem; color: #777; float: right;">1h ago</span></div>
                            <div style="margin-top: 10px; padding: 12px; background: #f8fafc; border-radius: 8px;">🎉 Your Task 2 repository link is verified successfully! <span style="font-size: 0.75rem; color: #777; float: right;">3h ago</span></div>
                        </div>
                    </div>

                    <!-- MESSAGES TAB -->
                    <div id="tab-messages" class="tab-content">
                        <div class="profile-box" style="text-align: left;">
                            <h3>Messages</h3>
                            <div style="margin-top: 15px; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 10px; display: flex; gap: 12px; align-items: center;">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" style="width:40px; height:40px; border-radius:50%;">
                                <div><strong>Swati Srivastava (CEO)</strong><div style="font-size: 0.85rem; color: #666;">Great progress on your internship tasks!</div></div>
                            </div>
                            <div style="padding: 12px; background: #f8fafc; border-radius: 8px; display: flex; gap: 12px; align-items: center;">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" style="width:40px; height:40px; border-radius:50%;">
                                <div><strong>Ayaan Khan</strong><div style="font-size: 0.85rem; color: #666;">Can you share the Express routing code?</div></div>
                            </div>
                        </div>
                    </div>

                    <!-- ANALYTICS TAB -->
                    <div id="tab-analytics" class="tab-content">
                        <div class="profile-box" style="text-align: left;">
                            <h3>Internship Analytics</h3>
                            <p style="color: #666; font-size: 0.9rem; margin-top: 5px;">CodeAlpha Full Stack Development Performance</p>
                            <div style="margin-top: 20px; display: flex; gap: 15px;">
                                <div style="flex:1; background:#f8fafc; padding:15px; border-radius:8px; border-left:4px solid #1a237e;">
                                    <h4>Completed Tasks</h4>
                                    <p style="font-size: 1.5rem; font-weight: bold; margin-top: 5px;">2 / 3</p>
                                </div>
                                <div style="flex:1; background:#f8fafc; padding:15px; border-radius:8px; border-left:4px solid #ad1457;">
                                    <h4>Profile Views</h4>
                                    <p style="font-size: 1.5rem; font-weight: bold; margin-top: 5px;">1,420</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SETTINGS TAB -->
                    <div id="tab-settings" class="tab-content">
                        <div class="profile-box" style="text-align: left;">
                            <h3>Account Settings</h3>
                            <div style="margin-top: 15px;">
                                <label style="font-size: 0.9rem; font-weight: 600;">Display Name</label>
                                <input type="text" value="Rahat Maqsood" style="width:100%; padding:10px; margin-top:5px; margin-bottom:15px; border:1px solid #ccc; border-radius:6px;">
                                <label style="font-size: 0.9rem; font-weight: 600;">Student ID (Locked)</label>
                                <input type="text" value="CA/DF1/251199" disabled style="width:100%; padding:10px; margin-top:5px; border:1px solid #ddd; background:#f1f1f1; border-radius:6px;">
                                <button onclick="alert('Settings saved successfully!')" style="margin-top: 15px; background:#ad1457; color:white; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer;">Save Changes</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <script>
                function switchTab(tabName) {
                    let tabs = document.querySelectorAll('.tab-content');
                    tabs.forEach(t => t.classList.remove('active'));
                    document.getElementById('tab-' + tabName).classList.add('active');
                }
            </script>
        </body>
        </html>
    `);
});

app.post('/add-post', (req, res) => {
    const newContent = req.body.content;
    if(newContent && newContent.trim() !== "") {
        posts.push({
            id: posts.length + 1,
            username: "Rahat Maqsood",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            time: "Just now",
            content: newContent,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
            likes: 1,
            comments: []
        });
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log('Professional Social Media app running at http://localhost:3000');
});