import React, { Component } from 'react';

class GroupInfoMember extends Component {
  render() {
    return (
      <div className="groupInfoMemberCard">
        <div>
          <img className="groupInfoMemberAvatar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAOVBMVEWVu9////+Rud6Ntt35+/2yzeeJtNzz9/vb5/OfweKnxuS60unp8PisyeXK3O62z+jT4vHi7PbB1uu558Z5AAADb0lEQVRoge2b23KrMAxFjYQxNoYQ/v9jj13SNKVctoicPJzs6XSamU5XLSRZl8SYjz766O0iQ+nrxUxu2AebFHz68UV0anzXuuou13a+Kc8mvsTqj+Kl9LHZur/Yr3NbLoglf13HZl19sUNTqLe5VVWHQmTq97BZfRmyP+JWVRFr066db9YuwG12/OpH10YdbBFuVVltbrMRv0s55SMfe/S3lD2boSecddXNYIRyq0r1xHTBwRdNMo84eNS0Na1chVuKqrYGsta3VLMXkKZ/5PW4JAPr2RpPH1mKKYTARD3LKoIFYawayG87sZE9Yz3u28LJGAlYk/u2zCXK1argFge3qtfigIMH1WtREMiaYWwkbq2KNQxWt6m+1S32GPauVrnK7FBwp9y3wfWtdr/YgCkkandtNGHgSb1DBm2t35ljfq3s01kUEHCJ+QsyElBuFW8CjhxKcIGnXOAJzzqoQ0rMfL50dDkqX4gP2q8HVCuAJXmnQVdtyAXkstxta5ezM908h/uVYsT1/Pu3FLEhurnjJpoWaDfNPPIuBk00MXX5Or6R02s73kO6Hu1tH5G46XXsSGc/QdzYe8q6W5QbEy5ddwnmvv3he0vZ2udXQvRA/fLdh0UP0YNZ6be/J/YzaDLDMku61b+Y/r+ly9XD+TUcd2vJOVpahA4bu1aR1d3JENvs1NxoPTEz5W/G23Gr2j/Xv+3egnW8jsM0DeM17l1ZZ+5JSYO4rRMJTTT22JZ4IIIW8EcSF/hQTYlIWIZJZg/7Enq2YAdxJBEY70qPJepb9SwttbVgoHYkUdGrFMSzBKGMNsOYBC0zPmpBJEnYSmlrlmC46RV9K3kX/pDV8uUsOGtqpo8sOIVIVpiI4O6GVX0reRfs1vDEFJNDubpOjbs1NliSCBxCyfZqiMAZhW6mzgKztXY0wfGEvatHIvAdQFqV7Y/AGhdffKBCFyT6YIyrWXDNAssu7cQFp67/D0z6zgVmLpWW/FFoe07K5AEurJkGNXO7YTkk2j80+81ZjoQ6evGMj8j4YXekc6A6Dv7kNJeYfT/GEyd3cew9PzfQTPAwtQ4+eu3aKSToM8zfR+/GWO+/v7qOY/f0QdfoTcZPyfYLfp0sO2VkyQ8Q5Pll07Dxoc8fV+iDN/k1q+8Etv+DeQHx4k9ofPTRRyv6B2C2JQW3J0ZmAAAAAElFTkSuQmCC" alt="avatar"/>
        </div>
        <div>
          {this.props.member}
        </div>
        <p>
          Member
        </p>
      </div>
    )
  }
}

export default GroupInfoMember;
