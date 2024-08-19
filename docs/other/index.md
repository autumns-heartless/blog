<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/116859018?s=64&v=4',
    name: '唐佳琪',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/tjq-123' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/153715078?s=64&v=4',
    name: '章家龙',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/kebi81' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/133222124?s=64&v=4',
    name: '井文超',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/jingwenchao' },
    ]
  },
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
