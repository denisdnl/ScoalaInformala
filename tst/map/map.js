function initMap() {
  var cluj = {lat: 46.7787327, lng: 23.5989759};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: cluj
  });

  var volunteerIcon = './circle-icon-volunteer.png';
  var packageIcon = './package-icon.png';

  var packagesPositions = getPackagesPositions();
  packagesPositions.forEach(function(packagePos) {
    new google.maps.Marker({
      position: packagePos,
      map: map,
      icon: packageIcon
    });
  });


  var volunteersPositions = getVolunteersPositions();
  volunteersPositions.forEach(function(volunteerPos) {
    new google.maps.Marker({
      position: volunteerPos,
      map: map,
      icon: volunteerIcon
    });
  })

}


function getVolunteersPositions() {
  var volunteers = [
    {
      "name": "Familie Defavorizata 1",
      "address": "Cluj-Napoca, str. Henri Barbusse",
      "coordinates": {
        "lat": "46.5787327",
        "long": "23.0989759"
      }
    },
    {
      "name": "Familie Defavorizata 2",
      "address": "Cluj-Napoca, str. Henri Barbusse",
      "coordinates": {
        "lat": "47.651261",
        "long": "23.572057"
      }
    }
  ];

  return volunteers.map(function(v){
    return {
      lat: Number(v.coordinates.lat),
      lng: Number(v.coordinates.long)
    };
  });
}

function getPackagesPositions() {
  var packages = [
    {
      "name": "Familie Defavorizata 1",
      "address": "Cluj-Napoca, str. Henri Barbusse",
      "coordinates": {
        "lat": "46.7787327",
        "long": "23.5989759"
      },
      "status": "Adopted",
      "details": "Numar copii: 1. Intoleranta la gluten",
      "volunteer": {
        "name": "Voluntar 1",
        "contactNumber": "+0740123456"
      }
    },
    {
      "name": "Familie Defavorizata 2",
      "address": "Cluj-Napoca, str. Henri Barbusse",
      "coordinates": {
        "lat": "47.641261",
        "long": "23.592057"
      },
      "status": "Unassigned",
      "details": "Numar copii: 3",
      "volunteer": {}
    }
  ];

  return packages.map(function(p){
    return {
      lat: Number(p.coordinates.lat),
      lng: Number(p.coordinates.long)
    };
  });
}
